class Award
  include Mongoid::Document
  include Mongoid::Timestamps

  field :awarded, type: Boolean, default: false

  belongs_to :holder, class_name: 'User'
  belongs_to :presenter, class_name: 'User'
  belongs_to :suggestion
end
