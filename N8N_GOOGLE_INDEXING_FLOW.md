# n8n Workflow: Automatic Google Indexing for Jekyll Blog

This workflow automates the process of submitting new posts from your Jekyll blog to the Google Search Console (via the Google Indexing API) using n8n.

## Prerequisites

1.  **Google Cloud Platform (GCP) Project**:
    *   Create a project.
    *   Enable the **Indexing API**.
    *   Create a **Service Account**.
    *   Download the **JSON Key** for the service account.
2.  **Google Search Console**:
    *   Add the **Service Account Email** (e.g., `indexing-bot@your-project.iam.gserviceaccount.com`) as an **Owner** (or Delegate) of your property (`https://codesilva.com`).
3.  **n8n Credentials**:
    *   Set up a **Google Service Account** credential in n8n using the JSON key.

## Workflow Overview

1.  **Trigger**: Schedule (e.g., Every Hour).
2.  **Fetch Data**: Download `https://codesilva.com/feed.xml`.
3.  **Parse**: Convert XML to JSON.
4.  **Filter**: Keep only posts published recently (e.g., in the last 24 hours or since the last run).
5.  **Submit**: Send `URL_UPDATED` request to Google Indexing API.

## Detailed Nodes Sketch

### 1. Schedule Trigger
*   **Name**: `Check for New Posts`
*   **Trigger Interval**: `Hours`
*   **Value**: `1` (or `24` if you prefer daily)

### 2. HTTP Request (Fetch Feed)
*   **Name**: `Fetch RSS Feed`
*   **Method**: `GET`
*   **URL**: `https://codesilva.com/feed.xml`
    *   *Reason*: `feed.xml` (Atom) is often easier to parse and contains `published` dates reliably compared to `sitemap.xml`.

### 3. XML to JSON
*   **Name**: `Parse XML`
*   **Input**: Output of `Fetch RSS Feed` (Binary/String)
*   **Options**: Ensure attributes are preserved to get `href` or `link` tags correctly.

### 4. Code / Filter (Logic)
*   **Name**: `Filter Recent Posts`
*   **Language**: JavaScript
*   **Logic**:
    ```javascript
    const items = items[0].json.feed.entry; // Adjust based on actual XML structure
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    return items.filter(item => {
      const pubDate = new Date(item.published); // or item.updated
      return pubDate > oneDayAgo;
    }).map(item => ({
      json: {
        url: item.link.href, // Adjust based on atom feed structure
        title: item.title
      }
    }));
    ```
    *   *Note*: If running hourly, you might want to filter by "last hour" or use a persistent state (Static Data) to remember the last processed post ID.

### 5. HTTP Request (Google Indexing API)
*   **Name**: `Submit to Google`
*   **Authentication**: `Google Service Account`
    *   **Scope**: `https://www.googleapis.com/auth/indexing`
*   **Method**: `POST`
*   **URL**: `https://indexing.googleapis.com/v3/urlNotifications:publish`
*   **Body Content Type**: `JSON`
*   **Body**:
    ```json
    {
      "url": "={{ $json.url }}",
      "type": "URL_UPDATED"
    }
    ```

## Important Considerations
*   **Quota**: The Indexing API has a quota (usually 200 per day). Filtering is important.
*   **Content Type**: While the Indexing API is technically for "JobPosting" and "BroadcastEvent", it effectively triggers a crawl for most URLs. Use with awareness of Google's guidelines.
*   **Alternative**: If you prefer the official "Sitemaps" API, you can change the final node to `GET https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fcodesilva.com/sitemaps/https%3A%2F%2Fcodesilva.com%2Fsitemap.xml` (Sitemaps.submit), but the Indexing API is faster for individual URLs.
