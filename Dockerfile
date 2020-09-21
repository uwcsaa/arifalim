FROM ruby:2.6.6

MAINTAINER Maxim Zelenkin <nudepatch@gmail.com>

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt update -q && apt install -y \
    build-essential \
    libpq-dev \
    nodejs \
    yarn \
    nano > /dev/null

ENV APP_PATH /app
RUN mkdir -p $APP_PATH
WORKDIR $APP_PATH

RUN \
  gem update --system --quiet && \
  gem install  bundler -v '~> 2.1'
ENV BUNDLER_VERSION 2.1

ENV BUNDLE_PATH /bundle
ENV GEM_HOME /bundle
ENV PATH="/bundle/bin:${PATH}"

RUN printf ' \
alias dp="bundle exec cap production deploy" \n\
alias sdp="bundle exec cap staging deploy" \n\
alias rc="bundle exec rails console" \n\
alias prc="bundle exec cap production rails:console" \n\
alias src="bundle exec cap staging rails:console" \n\
alias besr="RAILS_ENV=test bundle exec spring rspec" \n\
alias rtest="RAILS_ENV=test bundle exec rake test" \n\
alias be="bundle exec" \n\
alias rg="bundle exec rails generate" \n\
alias credit="EDITOR=nano bundle exec rails credentials:edit" \n\
alias migrate_all="bundle exec rails db:migrate && RAILS_ENV=test bundle exec rails db:migrate" \n\
alias rollback_all="bundle exec rails db:rollback && RAILS_ENV=test bundle exec rails db:rollback" \n\
' >> ~/.bashrc

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
