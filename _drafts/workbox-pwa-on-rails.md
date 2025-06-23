Download workbox

```
npx workbox-cli copyLibraries ~/projects/personal/workbox
```

Move this to `public/workbox` in your Rails app.

For now i just made a link

```bash
ln -s ~/projects/personal/workbox/public/workbox public/workbox
```

then i changed the service worker file


```javascript
importScripts('/workbox/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/workbox/'
});
```

I'm creating a gem with rails generators to deal with PWA patterns. Somehow git intereres with `gem build`. I renamed
a file and it broke everything

```bash
ARN: Unresolved or ambiguous specs during Gem::Specification.reset:
      stringio (>= 0)
      Available/installed versions of this gem:
      - 3.1.7
      - 3.0.4
WARN: Clearing out unresolved specs. Try 'gem cleanup <gem>'
Please report a bug if this causes problems.
WARNING:  See https://guides.rubygems.org/specification-reference/ for help
ERROR:  While executing gem ... (Gem::InvalidSpecificationException)
    ["lib/rails/generators/service_worker/init/route_generator.rb"] are not files
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/specification_policy.rb:497:in `error'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/specification_policy.rb:303:in `validate_non_files'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/specification_policy.rb:73:in `validate_required!'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/specification_policy.rb:44:in `validate'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/specification.rb:2631:in `validate'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/package.rb:298:in `build'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/package.rb:136:in `build'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/commands/build_command.rb:102:in `build_package'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/commands/build_command.rb:92:in `build_gem'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/commands/build_command.rb:72:in `execute'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/command.rb:327:in `invoke_with_build_args'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/command_manager.rb:252:in `invoke_command'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/command_manager.rb:192:in `process_args'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/command_manager.rb:150:in `run'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/lib/ruby/3.2.0/rubygems/gem_runner.rb:51:in `run'
	/Users/edysilva/.asdf/installs/ruby/3.2.2/bin/gem:10:in `<main>'
```

Okay, names matter here. 

```bash
created my gem and added to a rails project.

when i run rails generate --help i can see

PwaBuilder:
  pwa_builder:add_route
  pwa_builder:install
  pwa_builder:precache

but when i try to run any of these commands i get:

rails generate pwa_builder:install
Could not find generator 'pwa_builder:install'. (Rails::Command::CorrectableNameError)
Did you mean?  pwa_builder:precache
Run bin/rails generate --help for more options.
```

even though module name were correct the folder was not, it was acually `service_worker`. Even after renaming it to
`pwa_builder` I still got the same error. I had to create a `install` folder inside `pwa_builder` and move the
`install_generator.rb`
