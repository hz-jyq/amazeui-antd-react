RSpec.describe UsersController, type: :controller do
  describe 'POST /users/authenticate' do
    let(:user) { create(:user, password: 'password') }

    it 'expected response code 201' do
      post '/users/authenticate', user: { name: user.name, password: 'password' }
      expect(response_status).to eq(201)
      expect(response_body_as_json).to have_key('accessToken')
      expect(response_body_as_json['user']).to have_key('name')
      expect(response_body_as_json['user']).to have_key('role')
    end

    it 'expected response code 401 when use wrong username' do
      post '/users/authenticate', user: { name: "W#{user.name}", password: 'password' }
      expect(response_status).to eq(401)
      expect(response_body_as_json['error']).to match(/用户名.*错误/)
    end

    it 'expected response code 401 when use wrong password' do
      post '/users/authenticate', user: { name: user.name, password: 'wrong password' }
      expect(response_status).to eq(401)
      expect(response_body_as_json['error']).to match(/密码.*错误/)
    end
  end

  describe 'GET /users' do
    it 'expected response code 200' do
      users = create_list(:user, 8)
      authorize(users.first)
      get '/users'
      expect(response_status).to eq(200)
      expect(response_body_as_json.size).to eq(8)
    end

    it 'expected response code 401 when not signed in' do
      get '/users'
      expect(response_status).to eq(401)
      expect(response_body_as_json['error']).to match(/Missing Authorization header/)
    end
  end
end
