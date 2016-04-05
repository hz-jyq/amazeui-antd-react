class Review
  include Mongoid::Document
  include Mongoid::Timestamps

  field :score, type: Float

  belongs_to :reviewer, class_name: 'User'
  belongs_to :suggestion
end
