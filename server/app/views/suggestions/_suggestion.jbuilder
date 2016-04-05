json.(s, :id, :title, :content, :created_at, :state)
json.suggestion_type s.suggestion_type, :id, :name
json.submitter s.submitter, :id, :name
json.reviewers s.reviewers, :id, :name
