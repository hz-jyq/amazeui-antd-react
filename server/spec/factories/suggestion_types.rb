FactoryGirl.define do
  factory :suggestion_type do
    name do
      loop do
        name = FFaker::LoremCN.word
        break name unless SuggestionType.where(name: name).exists?
      end
    end
  end
end
