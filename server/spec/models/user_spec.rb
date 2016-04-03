RSpec.describe User, type: :model do
  it { is_expected.to be_timestamped_document }
  it { is_expected.to have_field(:name) }
  it { is_expected.to have_field(:role) }

  it { is_expected.to have_many(:suggestions) }
  it { is_expected.to have_and_belong_to_many(:suggestion_types) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_uniqueness_of(:name) }
  it { is_expected.to validate_inclusion_of(:role).to_allow(:user, :manager) }
end
