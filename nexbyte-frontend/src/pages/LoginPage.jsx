import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/apiService";

// Esquema de validación (igual al tuyo)
const loginSchema = z.object({
  correo: z
    .string()
    .email("Formato de correo inválido.")
    .refine((email) => /(duoc.cl|profesor.duoc.cl|gmail.com)$/i.test(email), {
      message:
        "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com",
    }),
  pass: z
    .string()
    .min(4, "La contraseña debe tener entre 4 y 10 caracteres.")
    .max(10, "La contraseña debe tener entre 4 y 10 caracteres."),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema), mode: "onTouched" });

  const [loginError, setLoginError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (data) => {
    setLoginError("");
    try {
      const response = await loginUser(data);
      if (response?.data?.token) {
        localStorage.setItem("nexbyte_token", response.data.token);
        window.dispatchEvent(new Event("auth-change")); // actualiza header
        navigate("/productos");
      } else {
        setLoginError("Respuesta inesperada del servidor.");
      }
    } catch (error) {
      console.error("Error de login:", error);
      if (error?.response?.status === 403 || error?.response?.status === 401) {
        setLoginError("Correo o contraseña incorrectos.");
      } else {
        setLoginError(
          "Error al intentar iniciar sesión. Inténtalo de nuevo más tarde."
        );
      }
    }
  };

  return (
    <main className="container section auth auth-center">
      <div className="card soft auth-card">
        <div className="text-center">
          <h1>Iniciar sesión</h1>
          <p className="muted">
            ¿No tienes una cuenta? <Link to="/registro">Crea una aquí</Link>
          </p>
        </div>

        {loginError && (
          <div
            className="card soft"
            style={{ padding: 12, borderColor: "rgba(239,68,68,.35)", marginTop: 12 }}
            role="alert"
          >
            <span style={{ color: "var(--err)" }}>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-3">
          <div className="form-row">
            <div>
              <label htmlFor="correo">Correo electrónico</label>
              <input
                id="correo"
                type="email"
                className={`input ${errors.correo ? "is-invalid" : ""}`}
                placeholder="tucorreo@duoc.cl"
                {...register("correo")}
                aria-invalid={!!errors.correo}
                aria-describedby={errors.correo ? "correo-error" : undefined}
              />
              {errors.correo && (
                <small id="correo-error" className="form-help">
                  {errors.correo.message}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="pass">Contraseña</label>
              <div className="input-group">
                <input
                  id="pass"
                  type={showPass ? "text" : "password"}
                  className={`input ${errors.pass ? "is-invalid" : ""}`}
                  placeholder="••••••"
                  {...register("pass")}
                  aria-invalid={!!errors.pass}
                  aria-describedby={errors.pass ? "pass-error" : undefined}
                />
                <button
                  type="button"
                  className="btn btn-ghost btn-small"
                  onClick={() => setShowPass((s) => !s)}
                  aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPass ? "Ocultar" : "Ver"}
                </button>
              </div>
              {errors.pass && (
                <small id="pass-error" className="form-help">
                  {errors.pass.message}
                </small>
              )}
            </div>
          </div>

          <div className="toolbar mt-3">
            <span className="spacer" />
            <Link to="/recuperar" className="muted">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div className="mt-3 right">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando…" : "Iniciar sesión"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
