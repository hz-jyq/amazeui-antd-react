RSpec.describe SuggestionsController, type: :controller do
  let(:user) { create(:user) }
  before(:each) { authorize(user) }

  describe 'GET /suggestions' do
    it 'expected response code 200' do
      create_list(:suggestion, 4)
      get '/suggestions'
      expect(response_status).to eq(200)
      expect(response_body_as_json.size).to eq(4)
    end

    describe 'with a filter' do
      before(:each) do
        create_list(:suggestion, 1, submitter: user).each { |s| s.tap(&:submit!) }

        suggestion_type = create(:suggestion_type, reviewers: [user])
        create_list(:suggestion, 2, suggestion_type: suggestion_type).each { |s| s.tap(&:submit!) }

        suggestion_type = create(:suggestion_type, public: false)
        create_list(:suggestion, 4, suggestion_type: suggestion_type).each { |s| s.tap(&:submit!) }
      end

      it 'expected show resource created by user when use :submitter' do
        get '/suggestions?filter=submitter'
        expect(response_status).to eq(200)
        expect(response_body_as_json.size).to eq(1)
      end

      it 'expected show resource reviewed by user when use :reviewer' do
        get '/suggestions?filter=reviewer'
        expect(response_status).to eq(200)
        expect(response_body_as_json.size).to eq(2)
      end

      it 'expected show resource publicized when use nothing' do
        get '/suggestions'
        expect(response_status).to eq(200)
        expect(response_body_as_json.size).to eq(3)
      end
    end
  end

  describe 'POST /suggestions' do
    it 'expected response code 201' do
      s = create(:suggestion_type)
      post '/suggestions', suggestion: { suggestion_type_id: s.id, title: 'TITLE', content: 'CONTENT' }
      expect(response_status).to eq(201)

      keys = %w(id title content created_at state suggestion_type submitter reviewers)
      keys.each { |key| expect(response_body_as_json).to have_key(key) }
      expect(response_body_as_json['title']).to eq('TITLE')
      expect(response_body_as_json['content']).to eq('CONTENT')
      expect(response_body_as_json['state']).to eq('reviewing')
      expect(response_body_as_json['suggestion_type']['name']).to eq(s.name)
      expect(response_body_as_json['submitter']['name']).to eq(user.name)
      expect(response_body_as_json['reviewers'][0]['name']).to eq(s.reviewers[0].name)
    end
  end

  describe 'GET /suggestions/:id' do
    it 'expected response code 200' do
      s = create(:suggestion)
      get "/suggestions/#{s.id}"
      expect(response_status).to eq(200)
    end

    context 'for unpublicized suggestion' do
      let(:suggestion_type) { create(:suggestion_type, public: false) }
      let(:suggestion) { create(:suggestion, suggestion_type: suggestion_type).tap(&:submit!) }

      it 'expected response code 200 as a submitter' do
        authorize(suggestion.submitter)
        get "/suggestions/#{suggestion.id}"
        expect(response_status).to eq(200)
      end

      it 'expected response code 200 as a reviewer' do
        authorize(suggestion_type.reviewers.first)
        get "/suggestions/#{suggestion.id}"
        expect(response_status).to eq(200)
      end

      it 'expected response code 403 as a visitor' do
        get "/suggestions/#{suggestion.id}"
        expect(response_status).to eq(403)
      end
    end
  end
end
