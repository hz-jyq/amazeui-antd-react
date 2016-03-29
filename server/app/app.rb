Dir["#{ALIEZ_ROOT}/app/{controllers,models}/**/*rb"].each { |f| require f }

class App
  def initialize
    @app = Rack::Builder.app do
      ApplicationController.subclasses.each do |controller|
        map(controller.prefix_uri) { run(controller.new) }
      end
    end
  end

  def call(env)
    @app.call(env)
  end
end
