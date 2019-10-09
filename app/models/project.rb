class Project < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :utilized, presence: true
end
