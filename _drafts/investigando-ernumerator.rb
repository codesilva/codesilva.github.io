# Description: This module is used to iterate over the collection of objects.
# This is just a self-made implementation of Ruby's Enumerator class.
class Iterator
  def initialize(&block)
    @block = block
  end

  def each(&each_block)
    return self unless block_given?

    yielder = Yielder.new(&each_block)

    @block.call(yielder)
  end

  def next
    start_fiber unless @fiber

    @fiber.resume
  end

  def start_fiber
    @fiber = Fiber.new do
      yielder = Yielder.new

      @block.call(yielder)
    end
  end

  def fiber_yielder
    @fiber_yielder ||= Fiber.new do
      @block.call(self)
    end
  end

  def map(&map_block)
    result = []

    each do |item|
      result << map_block.call(item)
    end
  end

  def filter(&filter_block)
    result = []

    each do |item|
      result << item if filter_block.call(item)
    end
  end

  def take(n)
    result = []

    # fica um pingue-pongue entre o Iterator atraves do each e o Iterator::Yielder
    each do |item|
      result << item

      break if result.size == n
    end

    result
  end
end

class Iterator::Yielder
  def initialize(&yielder_block)
    @yielder_block = yielder_block
  end

  def yield(item)
    return @yielder_block.call(item) if @yielder_block

    Fiber.yield(item)
  end

  alias << yield

  def next
    Fiber.yield(10)
  end

  # def next
  #   raise StopIteration if @it.nil?

  #   value = @it[:value].call

  #   @it = @it[:next]

  #   value
  # end

  # def lazy_yield(item)
  #   if @it.nil?
  #     @it = { value: -> { item }, done: true, next: nil }
  #   else
  #     # quando 3 chegar, já tem um next que aponta para o 2
  #     # precisamos levar o antigo next em consideracao

  #     previous_next = @it[:next]
  #     new_next = { value: -> { item }, done: true, next: nil }

  #     @it[:next] = new_next if @it[:next].nil?

  #     unless previous_next.nil?
  #       previous_next[:next] = new_next
  #     end

  #     @it[:done] = false
  #   end
  # end
end

# The block provided to the new method is not called right away.
# Only when a method like each, map, with_index is called, the block is called.
fib = Iterator.new do |yielder|
  a = b = 1
  loop do
    yielder << a
    a, b = b, a + b
  end
end

simple_iterator = Iterator.new do |y|
  y << 1
  y << 2
  y << 3
  # y << 9
end

pp fib.next
pp fib.next
pp fib.next
# pp simple_iterator.next
# pp simple_iterator.next
# pp simple_iterator.next
# pp simple_iterator.next

# pp simple_iterator.filter { |i| i.odd? }

# pp fibonacci.take(4)

# it.each do |i|
#   puts i

#   break
# end
