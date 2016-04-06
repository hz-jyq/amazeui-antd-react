RSpec.describe Review, type: :model do
  it { is_expected.to be_timestamped_document }
  it { is_expected.to have_field(:score) }

  it { is_expected.to belong_to(:reviewer).of_type(User) }
  it { is_expected.to belong_to(:suggestion) }

  it { is_expected.to validate_presence_of(:reviewer) }
  it { is_expected.to validate_presence_of(:suggestion) }
end
