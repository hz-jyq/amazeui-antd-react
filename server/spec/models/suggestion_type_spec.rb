RSpec.describe SuggestionType, type: :model do
  it { is_expected.to be_timestamped_document }
  it { is_expected.to have_field(:name) }
  it { is_expected.to have_field(:description) }
  it { is_expected.to have_field(:visibility) }

  it { is_expected.to have_many(:suggestions) }
  it { is_expected.to have_and_belong_to_many(:reviewers).of_type(User) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_uniqueness_of(:name) }
  it { is_expected.to validate_inclusion_of(:visibility).to_allow(:public, :protected) }
end
