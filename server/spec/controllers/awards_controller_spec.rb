RSpec.describe AwardsController, type: :controller do
  let(:user) { create(:user) }
  before(:each) { authorize(user) }

  describe 'GET /awards' do
  end
end
