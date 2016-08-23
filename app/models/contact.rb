class Contact < ActiveRecord::Base
  validates :name, presence: true
  validates :email, presence: true

  def created_at
    self[:created_at].strftime("%m/%d/%Y")
  end
end