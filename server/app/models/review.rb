class Review
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :reviewer, class_name: 'User'
  belongs_to :suggestion
end
