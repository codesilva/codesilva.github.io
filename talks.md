---
layout: page
title: Talks
permalink: /talks/
---

{% for talk in site.data.talks %}
<h2>
{{ talk.title }}
</h2>
<h4> Duration: ~{{talk.length_in_minutes}} min
    {% if talk.date && talk.date != '' %}
     / 
    Date: {{talk.date}} 
    {% endif %}
</h4>
<h4> Descrição:</h4>
> {{talk.description}}

{% if talk.talk_url != '' %}

{%if talk.talk_url_iframe %}
<iframe style="width: 100%" height="350" src="{{talk.talk_url}}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{% else %}
<h4>Talk:</h4>
[{{talk.talk_url}}]({{talk.talk_url}})
{% endif %}
{% endif %}

{% if talk.slides_url != '' %}
<h4>Slides:</h4>
[{{talk.slides_url}}]({{talk.slides_url}})
{% endif %}

<br />
{% endfor %}
