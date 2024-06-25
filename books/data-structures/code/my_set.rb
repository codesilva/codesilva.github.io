class MySet
  def initialize(enum=[])
    @items = []
  end

  def add(item)
    @items << item if can_add?(item)

    self
  end

  def has?(item)
    @items.select { |i| i.eql?(item) }.any?
  end

  def merge(other_set)
    if other_set.is_a?(MySet)
      @items = @items + other_set.to_a
    else
      raise "Invalid type"
    end
  end

  def subset?(other_set)
    other_set.to_a.all? { |item| has?(item) }
  end

  def to_a
    @items
  end

  private

  def can_add?(item_to_add)
    @items.filter { |item| item.eql?(item_to_add) }.empty?
  end
end
