class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title ,unique: true
      t.string :newsorg
      t.string :pubtime
      t.string :link
      t.string :date
      t.timestamps
      :title, unique: true
    end
  end
end
