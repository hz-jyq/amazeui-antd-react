require_relative './suggestion'

class Review
  include Mongoid::Document
  include Mongoid::Timestamps

  field :score, type: Float

  belongs_to :reviewer, class_name: 'User'
  belongs_to :suggestion

  validates :reviewer, presence: true
  validates :suggestion, presence: true
  validates :score, numericality: {
    greater_than_or_equal_to: Suggestion::SCORE_MIN_VALUE,
    less_than_or_equal_to: Suggestion::SCORE_MAX_VALUE
  }, allow_blank: true
end
