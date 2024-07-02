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
      pp block
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
    each do |elem|
      pp elem
      results << elem
      break if results.size >= n
    end
    results
  end
end

s = Stream.from_array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
# s.map { |x| x * 2 }.filter { |x| x > 5 }.take(3)
result = s.filter{|n| n % 2 == 1}.map{|x| x * 2}.take(2)
pp result

pp s
