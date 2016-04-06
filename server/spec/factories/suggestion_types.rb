FactoryGirl.define do
  factory :suggestion_type do
    transient do
      reviewers_count 1
    end

    name do
      loop do
        name = FFaker::LoremCN.word
        break name unless SuggestionType.where(name: name).exists?
      end
    end

    before(:create) do |suggestion_type, evaluator|
      suggestion_type.reviewers = create_list(:user, evaluator.reviewers_count)
    end
  end
end
