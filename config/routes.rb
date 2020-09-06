Rails.application.routes.draw do
  root to: 'home#index'
  get '/:page' => 'home#index'
end
