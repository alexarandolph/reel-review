import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountsRepository, AccountsOut, AccountsOutWithPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountsRepository,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountsRepository = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: AccountsOutWithPassword):
        # Return the encrypted password value from your
        # account object
        print(account)
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountsOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, AccountsOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
