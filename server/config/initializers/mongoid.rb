module BSON
  class ObjectId
    def as_json(options = nil)
      to_s.as_json
    end
  end
end
