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

      def authorize!(instance_or_class, action)
        klass = instance_or_class.model_name.name.constantize
        instance = instance_or_class.instance_of?(klass) ? instance_or_class : nil

        policy = "#{klass.name}Policy".constantize
        return if policy.new(current_user, instance).public_send(action)

        halt 403, jbuilder(%(json.error 'forbidden'))
      end
    end
  end
end
