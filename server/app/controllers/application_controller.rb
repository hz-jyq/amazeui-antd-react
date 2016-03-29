class ApplicationController
  def self.inherited(subclass)
    self.subclasses << subclass
  end

  def self.subclasses
    @subclasses ||= []
  end

  def self.prefix_uri
    "/#{self.name.underscore.sub(/_controller$/, '')}"
  end
end
