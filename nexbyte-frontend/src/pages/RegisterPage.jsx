// src/pages/RegisterPage.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/apiService";
import regionesData from "../data/regiones.js";
import { useToast } from "../components/ToastProvider.jsx";

/* ---------------- Helpers ----------------- */
function isValidRUN(run) {
  // Normaliza: quita espacios, puntos y guiones; y pasa a mayúsculas
  const r = String(run ?? "").replace(/[\s.-]/g, "").toUpperCase();
  if (!/^\d{7,8}[0-9K]$/.test(r)) return false;

  const body = r.slice(0, -1);
  const dv = r.slice(-1);

  let sum = 0, mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * mul;
    mul = (mul === 7) ? 2 : mul + 1;
  }

  const rest = 11 - (sum % 11);
  const dvCalc = rest === 11 ? "0" : rest === 10 ? "K" : String(rest);

  return dv === dvCalc;
}

const registerSchema = z
  .object({
    run: z.string().refine(isValidRUN, { message: "El RUN ingresado no es válido." }),
    nombre: z.string().min(2, "El nombre es requerido.").max(100),
    apellidos: z.string().min(2, "El apellido es requerido.").max(100),
    correo: z
      .string()
      .email("Formato de correo inválido.")
      .max(100)
      .refine((email) => /(duoc.cl|profesor.duoc.cl|gmail.com)$/i.test(email), {
        message: "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com",
      }),
    telefono: z
      .string()
      .optional()
      .refine((tel) => !tel || /^9\s\d{4}\s\d{4}$/.test(tel), {
        message: "Formato de teléfono debe ser 9 XXXX XXXX",
      }),
    pass: z.string().min(4, "La contraseña debe tener entre 4 y 10 caracteres.").max(10),
    pass2: z.string().min(4, "La confirmación es requerida."),
    region: z.string().min(1, "Debes seleccionar una región."),
    comuna: z.string().min(1, "Debes seleccionar una comuna."),
    direccion: z.string().min(3, "La dirección es requerida."),
  })
  .refine((data) => data.pass === data.pass2, {
    message: "Las contraseñas no coinciden.",
    path: ["pass2"],
  });

/* --------------- Component --------------- */
export default function RegisterPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema), mode: "onTouched" });

  const [comunas, setComunas] = useState([]);
  const [registerError, setRegisterError] = useState("");
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const selectedRegion = watch("region");

  useEffect(() => {
    if (selectedRegion) {
      const regionData = regionesData.find((r) => r.region === selectedRegion);
      setComunas(regionData ? regionData.comunas : []);
      setValue("comuna", "");
    } else {
      setComunas([]);
      setValue("comuna", "");
    }
  }, [selectedRegion, setValue]);

  // Formatea a "9 XXXX XXXX" mientras escribe
  const formatTel = (val) => {
    const nums = (val || "").replace(/\D/g, "");
    if (!nums) return "";
    const first = nums[0] || "";
    const mid = nums.slice(1, 5);
    const end = nums.slice(5, 9);
    return [first, mid && " " + mid, end && " " + end].filter(Boolean).join("");
  };

  const onSubmit = async (data) => {
    setRegisterError("");
    try {
      await registerUser(data);

      // Toast elegante (adiós alert)
      toast.success("¡Registro exitoso! Ya puedes iniciar sesión.", {
        title: "Cuenta creada",
        duration: 2600,
        action: { label: "Iniciar", onClick: () => navigate("/login") },
      });

      // Redirección corta para mantener el ritmo
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      console.error("Error en el registro:", error);
      if (error?.response?.data?.message) {
        setRegisterError(error.response.data.message);
      } else {
        setRegisterError("No se pudo completar el registro. Inténtalo de nuevo.");
      }
      // (Opcional) mostrar también un toast de error
      // toast.error(registerError || "No se pudo completar el registro.");
    }
  };

  return (
    <main className="container section auth auth-center">
      <div className="card soft auth-card" style={{ width: "min(760px, 100%)" }}>
        <div className="text-center">
          <h1>Crear cuenta</h1>
          <p className="muted">Los campos marcados con * son obligatorios.</p>
        </div>

        {registerError && (
          <div
            className="card soft"
            style={{ padding: 12, borderColor: "rgba(239,68,68,.35)", marginTop: 12 }}
            role="alert"
          >
            <span style={{ color: "var(--err)" }}>{registerError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-3">
          {/* RUN */}
          <div>
            <label htmlFor="run">RUN *</label>
            <input
              id="run"
              className={`input ${errors.run ? "is-invalid" : ""}`}
              placeholder="Ej: 19011022K"
              autoCapitalize="off"
              autoComplete="off"
              {...register("run")}
            />
            {errors.run && <small className="form-help">{errors.run.message}</small>}
          </div>

          {/* Nombre y Apellidos */}
          <div className="form-row mt-3">
            <div>
              <label htmlFor="nombre">Nombre *</label>
              <input
                id="nombre"
                className={`input ${errors.nombre ? "is-invalid" : ""}`}
                {...register("nombre")}
              />
              {errors.nombre && <small className="form-help">{errors.nombre.message}</small>}
            </div>
            <div>
              <label htmlFor="apellidos">Apellidos *</label>
              <input
                id="apellidos"
                className={`input ${errors.apellidos ? "is-invalid" : ""}`}
                {...register("apellidos")}
              />
              {errors.apellidos && <small className="form-help">{errors.apellidos.message}</small>}
            </div>
          </div>

          {/* Correo */}
          <div className="mt-3">
            <label htmlFor="correo">Correo *</label>
            <input
              id="correo"
              type="email"
              className={`input ${errors.correo ? "is-invalid" : ""}`}
              placeholder="usuario@duoc.cl"
              autoCapitalize="off"
              autoComplete="email"
              {...register("correo")}
            />
            <small className="muted">
              Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com
            </small>
            {errors.correo && <small className="form-help">{errors.correo.message}</small>}
          </div>

          {/* Contraseñas */}
          <div className="form-row mt-3">
            <div>
              <label htmlFor="pass">Contraseña *</label>
              <div className="input-group">
                <input
                  id="pass"
                  type={showPass1 ? "text" : "password"}
                  className={`input ${errors.pass ? "is-invalid" : ""}`}
                  placeholder="4 a 10 caracteres"
                  autoComplete="new-password"
                  {...register("pass")}
                />
                <button
                  type="button"
                  className="btn btn-ghost btn-small"
                  onClick={() => setShowPass1((s) => !s)}
                >
                  {showPass1 ? "Ocultar" : "Ver"}
                </button>
              </div>
              {errors.pass && <small className="form-help">{errors.pass.message}</small>}
            </div>

            <div>
              <label htmlFor="pass2">Confirmar contraseña *</label>
              <div className="input-group">
                <input
                  id="pass2"
                  type={showPass2 ? "text" : "password"}
                  className={`input ${errors.pass2 ? "is-invalid" : ""}`}
                  autoComplete="new-password"
                  {...register("pass2")}
                />
                <button
                  type="button"
                  className="btn btn-ghost btn-small"
                  onClick={() => setShowPass2((s) => !s)}
                >
                  {showPass2 ? "Ocultar" : "Ver"}
                </button>
              </div>
              {errors.pass2 && <small className="form-help">{errors.pass2.message}</small>}
            </div>
          </div>

          {/* Región y Comuna */}
          <div className="form-row mt-3">
            <div>
              <label htmlFor="region">Región *</label>
              <select
                id="region"
                className={`input ${errors.region ? "is-invalid" : ""}`}
                {...register("region")}
                defaultValue=""
              >
                <option value="">Seleccione…</option>
                {regionesData.map((r) => (
                  <option key={r.region} value={r.region}>
                    {r.region}
                  </option>
                ))}
              </select>
              {errors.region && <small className="form-help">{errors.region.message}</small>}
            </div>

            <div>
              <label htmlFor="comuna">Comuna *</label>
              <select
                id="comuna"
                className={`input ${errors.comuna ? "is-invalid" : ""}`}
                {...register("comuna")}
                disabled={!selectedRegion}
                defaultValue=""
              >
                <option value="">Seleccione…</option>
                {comunas.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.comuna && <small className="form-help">{errors.comuna.message}</small>}
            </div>
          </div>

          {/* Teléfono y Dirección */}
          <div className="form-row mt-3">
            <div>
              <label htmlFor="telefono">Teléfono (opcional)</label>
              <input
                id="telefono"
                className={`input ${errors.telefono ? "is-invalid" : ""}`}
                placeholder="9 XXXX XXXX"
                inputMode="numeric"
                autoComplete="tel"
                {...register("telefono")}
                onChange={(e) => {
                  const v = formatTel(e.target.value);
                  setValue("telefono", v, { shouldValidate: true });
                }}
              />
              {errors.telefono && <small className="form-help">{errors.telefono.message}</small>}
            </div>

            <div>
              <label htmlFor="direccion">Dirección *</label>
              <input
                id="direccion"
                className={`input ${errors.direccion ? "is-invalid" : ""}`}
                {...register("direccion")}
              />
              {errors.direccion && <small className="form-help">{errors.direccion.message}</small>}
            </div>
          </div>

          {/* Botones */}
          <div className="toolbar mt-4">
            <Link to="/login" className="btn btn-ghost">Ya tengo cuenta</Link>
            <span className="spacer" />
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registrando…" : "Crear cuenta"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
