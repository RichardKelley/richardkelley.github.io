from __future__ import annotations

import logging
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse


logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    datefmt="%H:%M:%S",
    force=True,
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI):
    logger.info("Application startup complete")
    yield


app = FastAPI(
    title="Logging Demo",
    description="A very small FastAPI app that demonstrates file logging.",
    lifespan=lifespan,
)


@app.get("/")
async def root():
    logger.info("Home page visited")
    return {
        "message": "Logging demo is running",
        "ideas": [
            "Log messages can be written to a file",
            "Use log levels: INFO, WARNING, ERROR",
            "Log exceptions with stack traces",
        ],
        "log_file": "app.log",
    }


@app.get("/items/{item_id}")
async def get_item(item_id: int):
    logger.info("Looking up item %s", item_id)
    if item_id < 0:
        logger.warning("Negative item requested: %s", item_id)
        return JSONResponse(
            status_code=400,
            content={"error": "item_id must be non-negative"},
        )

    return {"item_id": item_id, "status": "ok"}


@app.get("/crash")
async def crash():
    try:
        raise RuntimeError("Simulated server failure for logging demo")
    except RuntimeError:
        logger.exception("Example error")
        return JSONResponse(
            status_code=500,
            content={"error": "example failure was logged"},
        )


def main() -> None:
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)


if __name__ == "__main__":
    main()
