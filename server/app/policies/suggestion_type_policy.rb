class SuggestionTypePolicy
  def initialize(user, record)
    @user = user
    @record = record
  end

  def creatable?
    @user.has_role?(:manager)
  end

  def readable?
    @user.has_role?(:manager)
  end

  def updatable?
    @user.has_role?(:manager)
  end

  def deletable?
    @user.has_role?(:manager)
  end
end
