1. Write code that walks throught directories and collect files
    - make it concurrent
2. Parses html file
    - make it concurrent

```ex
defmodule HtmlTagAnalyzer do
  def print_all([h | []]) do
    IO.puts(h)
  end

  def print_all([h | t]) do
    IO.puts(h)

    print_all(t)
  end

  def analyze_html(html) do
    tag_counts = %{}
    tag_regex = ~r/<([a-z1-6]+)/

    Enum.reduce_while(tag_regex |> Regex.scan(html), tag_counts, fn [_, tag], acc ->
      updated_acc = Map.update(acc, String.downcase(tag), 1, fn count -> count + 1 end)

      {:cont, updated_acc}
    end)
  end

  def process_html_files(files) do
    Enum.reduce(files, %{}, fn file, acc ->
      case File.read(file) do
        {:ok, html} ->
          tag_counts = analyze_html(html)
          Map.merge(acc, tag_counts, fn _k, value1, value2 -> value1 + value2 end)

        {:error, reason} ->
          acc
      end
    end)
  end
end

defmodule HtmlTagsCollector do
  @basedir "mercury/src"

  def run do
    {:ok, files} = File.ls(@basedir)

    loop(files, @basedir, [])
  end

  def collect_tsx_files(basedir) do
    Path.wildcard("#{basedir}/*.tsx")
  end

  def loop([], _, acc) do
    acc
  end

  def loop([item | items], basedir, tsx_acc) do
    new_base_dir = "#{basedir}/#{item}"
    is_dir = File.dir?(new_base_dir)

    tsx =
      case is_dir do
        true ->
          {:ok, f} = File.ls(new_base_dir)
          loop(f, new_base_dir, [])

        false ->
          is_tsx = Regex.match?(~r/(?<!snap|test)\.tsx$/, item)

          case is_tsx do
            true -> [new_base_dir]
            false -> []
          end
      end

    loop(items, basedir, tsx ++ tsx_acc)
  end
end

# Collected from mdn reference
# https://developer.mozilla.org/en-US/docs/Web/HTML/Element
# Array.from($0.children).map(li => li.children[0].innerText.replace('<', '').replace('>', '')).reduce((acc, current) => {
# acc[current] = true;
#
#    return acc;
#}, {})
existing_tags = %{
  "a" => true,
  "abbr" => true,
  "acronym" => true,
  "address" => true,
  "area" => true,
  "article" => true,
  "aside" => true,
  "audio" => true,
  "b" => true,
  "base" => true,
  "bdi" => true,
  "bdo" => true,
  "big" => true,
  "blockquote" => true,
  "body" => true,
  "br" => true,
  "button" => true,
  "canvas" => true,
  "caption" => true,
  "center" => true,
  "cite" => true,
  "code" => true,
  "col" => true,
  "colgroup" => true,
  "data" => true,
  "datalist" => true,
  "dd" => true,
  "del" => true,
  "details" => true,
  "dfn" => true,
  "dialog" => true,
  "dir" => true,
  "div" => true,
  "dl" => true,
  "dt" => true,
  "em" => true,
  "embed" => true,
  "fieldset" => true,
  "figcaption" => true,
  "figure" => true,
  "font" => true,
  "footer" => true,
  "form" => true,
  "frame" => true,
  "frameset" => true,
  "h1" => true,
  "head" => true,
  "header" => true,
  "hgroup" => true,
  "hr" => true,
  "html" => true,
  "i" => true,
  "iframe" => true,
  "image" => true,
  "img" => true,
  "input" => true,
  "ins" => true,
  "kbd" => true,
  "label" => true,
  "legend" => true,
  "li" => true,
  "link" => true,
  "main" => true,
  "map" => true,
  "mark" => true,
  "marquee" => true,
  "menu" => true,
  "menuitem" => true,
  "meta" => true,
  "meter" => true,
  "nav" => true,
  "nobr" => true,
  "noembed" => true,
  "noframes" => true,
  "noscript" => true,
  "object" => true,
  "ol" => true,
  "optgroup" => true,
  "option" => true,
  "output" => true,
  "p" => true,
  "param" => true,
  "picture" => true,
  "plaintext" => true,
  "portal" => true,
  "pre" => true,
  "progress" => true,
  "q" => true,
  "rb" => true,
  "rp" => true,
  "rt" => true,
  "rtc" => true,
  "ruby" => true,
  "s" => true,
  "samp" => true,
  "script" => true,
  "search" => true,
  "section" => true,
  "select" => true,
  "slot" => true,
  "small" => true,
  "source" => true,
  "span" => true,
  "strike" => true,
  "strong" => true,
  "style" => true,
  "sub" => true,
  "summary" => true,
  "sup" => true,
  "table" => true,
  "tbody" => true,
  "td" => true,
  "template" => true,
  "textarea" => true,
  "tfoot" => true,
  "th" => true,
  "thead" => true,
  "time" => true,
  "title" => true,
  "tr" => true,
  "track" => true,
  "tt" => true,
  "u" => true,
  "ul" => true,
  "var" => true,
  "video" => true,
  "wbr" => true,
  "xmp" => true
}

final = HtmlTagsCollector.run() |> HtmlTagAnalyzer.process_html_files()

sanitized = Map.keys(final) |> Enum.filter(fn tag -> Map.get(existing_tags, tag, false) end)

# HtmlTagAnalyzer.print_all(sanitized)

IO.puts "Found #{length(sanitized)} of #{map_size(existing_tags)} tags"
IO.puts "Percent: #{100 * length(sanitized) / map_size(existing_tags)}%"
IO.puts "Percent: #{100 * length(sanitized) / 140}%"

# HtmlTagAnalyzer.print_all(Map.keys(final))
```
