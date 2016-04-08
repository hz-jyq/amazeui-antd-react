module Endpoint
  extend ActiveSupport::Concern

  included do
    set(:route_url) { "/#{name.underscore.sub(/_controller\z/, '')}" }

    helpers do
      def indifferent_params(params)
        ActiveSupport::HashWithIndifferentAccess.new(params)
      end

      def current_user
        @current_user ||= User.find(env['jwt.payload']['sub'])
      end

      def authorize!(record, query)
        return if Pundit.policy(current_user, record).public_send(query)
        halt 403, jbuilder(%(json.error 'forbidden'))
      end
    end
  end
end
