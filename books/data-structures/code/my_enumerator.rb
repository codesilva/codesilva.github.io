class Yielder
  attr_accessor :items, :done, :index

  def initialize()
    @items = []
    @done = false
    @index = 0
  end

  def yield(value)
    @items << value
  end

  alias << yield
end

class MyLazyEnumerator
  def initialize(&block)
    @block = block
    @yielder = Yielder.new
  end

  def rewind
    @yielder.index = 0
    @yielder.done = false
  end

  def next
    if @yielder.done
      raise StopIteration
    end

    if @yielder.index < @yielder.items.size
      item = @yielder.items[@yielder.index]
      @yielder.index += 1

      @yielder.done = true if @yielder.index == @yielder.items.size

      return item
    end
  end

  def each
    while !@yielder.done
      yield self.next
    end
  end

  def map
    result = []

    while !@yielder.done
      result << yield(self.next)
    end

    result
  end
end

class MyEnumerator
  def initialize(&block)
    @block = block
    @yielder = Yielder.new

    if block_given?
      @block.call(@yielder)
    end
  end

  def rewind
    @yielder.index = 0
    @yielder.done = false
  end

  def next
    if @yielder.done
      raise StopIteration
    end

    if @yielder.index < @yielder.items.size
      item = @yielder.items[@yielder.index]
      @yielder.index += 1

      @yielder.done = true if @yielder.index == @yielder.items.size

      return item
    end
  end

  def each
    while !@yielder.done
      yield self.next
    end
  end

  def map
    result = []

    while !@yielder.done
      result << yield(self.next)
    end

    result
  end

  def with_index
    while !@yielder.done
      yield(self.next, @yielder.index)
    end
  end
end

e = MyEnumerator.new do |yielder|
  puts "yielder: #{yielder}"
  yielder << 'ola'
  yielder << 'edy'
  yielder << 'silva'
end


