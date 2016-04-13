module Endpoint
  extend ActiveSupport::Concern

  included do
    configure do
      set :route_url, -> { "/#{name.underscore.sub(/_controller\z/, '')}" }
    end

    helpers do
      # overwrite Sinatra::Base#indifferent_params
      def indifferent_params(params)
        ActiveSupport::HashWithIndifferentAccess.new(params)
      end

      # overwrite Sinatra::Base#logger
      def logger
        settings.logger
      end

      def current_user
        @current_user ||= User.find(env['jwt.payload']['sub'])
      end

      def authorize!(record, query)
        return if Pundit.policy(current_user, record).public_send(query)
        halt 403, jbuilder(%(json.error 'Forbidden'))
      end
    end

    error Mongoid::Errors::DocumentNotFound do
      logger.error env['sinatra.error']
      jbuilder(%(json.error 'Not Found'))
    end

    error do
      logger.error env['sinatra.error']
      jbuilder(%(json.error '#{env['sinatra.error'].message}'))
    end
  end
end
