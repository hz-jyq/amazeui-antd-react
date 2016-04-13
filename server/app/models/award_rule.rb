require_relative './suggestion'

class AwardRule
  include Mongoid::Document
  include Mongoid::Timestamps

  field :score_accepted_level, type: Integer
  field :action, type: String

  belongs_to :presenter, class_name: 'User', inverse_of: :award_rules, index: true

  validates :score_accepted_level, inclusion: Suggestion::SCORE_ACCEPTED_LEVEL.keys
  validates :action, presence: true
  validates :presenter, presence: true
end
