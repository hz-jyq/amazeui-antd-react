class Award
  include Mongoid::Document
  include Mongoid::Timestamps

  field :awarded, type: Boolean, default: false

  belongs_to :holder, class_name: 'User', inverse_of: :awards
  belongs_to :presenter, class_name: 'User', inverse_of: :award_awards
end
