Dir["#{ALIEZ_ROOT}/app/models/concerns/*rb"].each { |f| require f }
Dir["#{ALIEZ_ROOT}/app/models/*rb"].each { |f| require f }
Dir["#{ALIEZ_ROOT}/app/controllers/concerns/*rb"].each { |f| require f }
Dir["#{ALIEZ_ROOT}/app/controllers/*rb"].each { |f| require f }

class App
  def initialize
    @app = Rack::Builder.app do
      use Rack::PostBodyContentTypeParser
      use Rack::JWT::Auth, secret: Settings[:session][:secret], exclude: ['/users/authenticate']

      controllers = ObjectSpace.each_object(Class).select { |klass| klass.include?(Endpoint) }
      controllers.each do |controller|
        map(controller.prefix_uri) { run(controller.new) }
      end
    end
  end

  def call(env)
    @app.call(env)
  end
end
