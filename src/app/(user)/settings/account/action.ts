"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { updatePasswordSchema } from "./schema";
import { z } from "zod";
