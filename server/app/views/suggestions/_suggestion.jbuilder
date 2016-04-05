json.(s, :id, :title, :content, :created_at, :state)
json.submitter s.user, :id, :name
json.suggestion_type s.suggestion_type, :id, :name
