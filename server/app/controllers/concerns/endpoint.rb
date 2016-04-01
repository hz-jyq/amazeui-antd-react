module Endpoint
  extend ActiveSupport::Concern

  included do
    set(:url) { "/#{name.underscore.sub(/_controller\z/, '')}" }
    set(:views) { "#{ALIEZ_ROOT}/app/views" }

    helpers do
      def indifferent_params(params)
        ActiveSupport::HashWithIndifferentAccess.new(params)
      end

      def current_user
        @current_user ||= User.find(env['jwt.payload']['sub'])
      end

      def authorize!(*roles)
        return if roles.include?(current_user.role)
        halt 403, jbuilder(%(json.error 'forbidden'))
      end
    end
  end
end
