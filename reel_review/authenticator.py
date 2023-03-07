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
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountsRepository = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountsOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountsOut):
        return account.username, AccountsOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
