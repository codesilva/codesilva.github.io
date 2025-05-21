class Stream
  def initialize(&block)
    @block = block
  end

  def self.from_array(array)
    new do |yielder|
      array.each { |elem| yielder << elem }
    end
  end

  def each(&block)
    enumerator = Enumerator.new do |yielder|
      @block.call(yielder)
    end

    enumerator.each(&block)
  end

  def map(&block)
    Stream.new do |yielder|
      each do |elem|
        yielder << block.call(elem)
      end
    end
  end

  def filter(&block)
    Stream.new do |yielder|
      each do |elem|
        yielder << elem if block.call(elem)
      end
    end
  end

  def take(n)
    results = []
    each do |elem| # this elem is determined by the @block.call(yielder) in each method, line 14
      pp elem
      results << elem
      break if results.size >= n
    end

    results
  end
end

s = Stream.from_array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
result = s.filter do |number|
  puts 'filter was called'
  number.even?
end.map do |n|
  puts 'map was called'
  n * 2
end.take(2)

pp result
