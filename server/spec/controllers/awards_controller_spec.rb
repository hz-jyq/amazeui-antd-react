RSpec.describe AwardsController, type: :controller do
  let(:user) { create(:user) }
  before(:each) { authorize(user) }

  describe 'GET /awards' do
    it 'expected response code 200' do
      create_list(:award, 4, presenter: user)
      get '/awards?identifier=presenter'
      expect(response_status).to eq(200)
      expect(response_body_as_json.size).to eq(4)
    end

    describe 'params: identifier' do
      before(:each) do
        create_list(:award, 1, holder: user)
        create_list(:award, 2, presenter: user)
      end

      it 'expected show resource hold by user when use :holder' do
        get '/awards?identifier=holder'
        expect(response_status).to eq(200)
        expect(response_body_as_json.size).to eq(1)
      end

      it 'expected show resource present by user when use :presenter' do
        get '/awards?identifier=presenter'
        expect(response_status).to eq(200)
        expect(response_body_as_json.size).to eq(2)
      end

      it 'expected nothing when use nothing' do
        get '/awards'
        expect(response_status).to eq(200)
        expect(response_body_as_json.size).to eq(0)
      end
    end
  end
end
