from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from typing import Optional
from queries.accounts import AccountsIn, AccountsRepository, AccountsOut, AccountsOutWithPassword
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from queries.accounts import (
    AccountsIn,
    AccountsOut,
    AccountsRepository,
    DuplicateAccountError,
)
import os


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountsOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/protected", response_model=bool)
async def get_protected(
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    return True

@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountsOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.delete("/api/accounts/{username}", response_model=bool, tags=["accounts"])
def delete_account(
    username: str,
    repo: AccountsRepository = Depends(),
) -> bool:
    return repo.delete(username)
    # if username not in AccountsRepository:
    #     raise HTTPException(status_code=404, detail="Usename not found")


@router.post("/api/accounts", response_model=AccountToken | HttpError, tags=["accounts"])
async def create_account(
    info: AccountsIn,
    request: Request,
    response: Response,
    repo: AccountsRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
