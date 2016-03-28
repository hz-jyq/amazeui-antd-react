class App
  def initialize
    @app = Rack::Builder.app do
      map('/') do
        run Sinatra.new { get('/') { 'hello, world' } }
      end
    end
  end

  def call(env)
    @app.call(env)
  end
end
