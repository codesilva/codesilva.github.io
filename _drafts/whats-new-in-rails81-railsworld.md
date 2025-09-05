# What's new in Rails Ecosystem (and Rails 8.1)

RailsWorld 2025 is currently taking place in Amsterdam, and, as always, DHH, the creator of Rails, has made some exciting announcements. In this article, we'll cover some of the most important ones.

https://github.com/rails/rails/releases/tag/v8.1.0.beta1
https://rubyonrails.org/2025/9/4/rails-8-1-beta-1

# Active Job Continuations

With `Continuations`, you can now split a job into multiple steps. Interrupted jobs can be resumed from the last successfully completed step.

```rb
class ProcessImportJob
  include ActiveJob::Continuable

  def perform(import_id)
    @import = Import.find(import_id)

    # block format
    step :initialize do
      @import.initialize
    end

    # step with cursor, the cursor is saved when the job is interrupted
    step :process do |step|
      @import.records.find_each(start: step.cursor) do |record|
        record.process
        step.advance! from: record.id
      end
    end

    # method format
    step :finalize

    private
      def finalize
        @import.finalize
      end
  end
end
```

# [Active Record Tenanting](https://github.com/basecamp/activerecord-tenanted)

This new gem makes it easy to build [multi-tenant](https://en.wikipedia.org/wiki/Multitenancy) applications with Rails. It allows you to write your Rails application as if it were a single-tenant app. Just follow the conventions and the gem will do the rest.

```rb
# config/application.rb
config.active_record_tenanted.tenant_resolver = ->(request) {
    Account.extract(request)
}

# app/models/signup.rb
def create_tenant
    ApplicationRecord.create_tenant(tenant_name) do
        @account = Account.create
        @account.setup_basic_template
    end
end
```
> For now, it's fully compatible with SQLite only.

# [Action Push Native](https://github.com/rails/action_push_native)

A new library to send push notifications to iOS and Android devices using the native push notification services (APNs and FCM).

It's such a nice abstraction that makes it simpler to engage with users through push notifications.

Action Push Web still needs to be extracted, and [`Campfire`](https://github.com/basecamp/once-campfire), which is now free, will be used for that.

## Turbo Offline

It's in [progress yet](https://github.com/hotwired/turbo/pull/1427), but it's a great addition to the Hotwired family.
Turbo Offline will make it possible to create offline-first applications with Rails and Hotwire. And since Hotwire Native uses Turbo, it will work on mobile apps as well.

Another great addition to the native capabilities of the Rails ecosystem.

# [Lexxy](https://github.com/basecamp/lexxy)

Lexxy is a modern rich text editor that supports, among other features, PDF/video previews, real-time code syntax highlighting, and markdown shortcuts.

We can expect it to be the new default editor for ActionText.

# [Omarchy](https://omarchy.org/)

Omarchy is an Arch-based operating system optimized for Ruby and Rails development. It comes with pre-installed tools
and libraries that are commonly used in the Ruby on Rails ecosystem.

It also comes with Hyprland, a tiling window manager that makes it easy to manage multiple windows and workspaces.

Since it's opinionated, getting started with Omarchy shouldn't take more than 10 minutes to install and start coding.

# Markdown Rendering

Markdown is being very demanding in these AI days. Rails 8.1 simplifies rendering markdown when responding to requests.

```rb
class Page
  def to_markdown
    body
  end
end

class PagesController < ActionController::Base
  def show
    @page = Page.find(params[:id])

    respond_to do |format|
      format.html
      format.md { render markdown: @page }
    end
  end
end
```

# What else?

- Beamer, replication tool for SQLite that allows you to build multi-server, geographically distributed Rails applications with SQLite.
- Kamal Geo Proxy, extends Kamal Proxy to support multi-region routing.

There are some other improvements and new features in Rails 8.1. Check the [release notes](https://rubyonrails.org/2025/9/4/rails-8-1-beta-1) for more details.

# Conclusion

We received a great set of new features and improvements in the Rails ecosystem. The work on mobile native capabilities is clear, and it's great to see how the community is embracing it. It's also good to see all the improvements on DX, though the modernization of tools like Lexxy, Omarchy, and the Continuations in Active Job.

That's all for today. Happy coding and [count on Codeminer42](https://www.codeminer42.com/contact) if you need help migrating or introducing your team to Rails 8.1 and all its new ecosystem improvements!

