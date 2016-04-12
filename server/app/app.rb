Dir["#{ALIEZ_ROOT}/app/policies/concerns/*rb"].each { |f| require f }
Dir["#{ALIEZ_ROOT}/app/policies/*rb"].each { |f| require f }
Dir["#{ALIEZ_ROOT}/app/models/concerns/*rb"].each { |f| require f }
Dir["#{ALIEZ_ROOT}/app/models/*rb"].each { |f| require f }
Dir["#{ALIEZ_ROOT}/app/controllers/concerns/*rb"].each { |f| require f }
Dir["#{ALIEZ_ROOT}/app/controllers/*rb"].each { |f| require f }

class App
  class UnknownRouteHandler
    def call(_env)
      [404, { 'Content-Type' => 'application/json' }, ['Not Found'.freeze]]
    end
  end

  def initialize
    @app = Rack::Builder.app(UnknownRouteHandler.new) do
      use Rack::PostBodyContentTypeParser
      use Rack::JWT::Auth, secret: Settings[:session][:secret], exclude: ['/users/authenticate']

      controllers = Object.constants.grep(/Controller\z/).map { |c| Object.const_get(c) }
      controllers.each do |controller|
        map(controller.route_url) { run(controller.new(UnknownRouteHandler.new)) }
      end
    end
  end

  def call(env)
    @app.call(env)
  end
end
