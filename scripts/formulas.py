import math

G = 6.67430e-11
C = 2.99792458e8
HBAR = 1.054571817e-34
K_B = 1.380649e-23
M_SUN = 1.98847e30
R_SUN = 6.957e8
M_EARTH = 5.9722e24
R_EARTH = 6.371e6
YEAR = 3.15576e7
AGE_UNIVERSE_YEARS = 1.38e10
PAGE_RATIO_4D = 1.4847
AU = 1.495978707e11
L_SUN = 3.828e26
T_SUN = 5772.0
R_JUPITER = 7.1492e7
M_JUPITER = 1.89813e27
DAY = 86400.0
JUPITER_PERIOD_YEARS = 11.862
G0 = 9.80665
M_MOON = 7.342e22
R_MOON = 1.7374e6
MOON_ORBIT_RADIUS = 3.844e8
MOON_SIDEREAL_DAYS = 27.321661
EARTH_ECCENTRICITY = 0.0167
RHO_WATER = 1000.0
RHO_ICE = 917.0
RHO_SEAWATER = 1025.0
ATM = 101325.0
E_CHARGE = 1.602176634e-19
M_ELECTRON = 9.1093837e-31
M_PROTON = 1.67262192e-27
EPS0 = 8.8541878128e-12
MU0 = 1.25663706212e-6
K_E = 1 / (4 * math.pi * EPS0)
N_COPPER = 8.49e28


def escape_velocity(m, r):
    return math.sqrt(2 * G * m / r)


def schwarzschild_radius(m):
    return 2 * G * m / C**2


def hawking_temperature(m):
    return HBAR * C**3 / (8 * math.pi * G * m * K_B)


def bh_entropy_over_kb(m):
    return 4 * math.pi * G * m**2 / (HBAR * C)


def evaporation_time_years(m):
    return 5120 * math.pi * G**2 * m**3 / (HBAR * C**4) / YEAR


def lorentz_gamma(beta):
    return 1 / math.sqrt(1 - beta**2)


def page_time_fraction(ratio=PAGE_RATIO_4D):
    x = ratio / (1 + ratio)
    return 1 - x**1.5


def kepler_period_days(a, m):
    return 2 * math.pi * math.sqrt(a**3 / (G * m)) / DAY


def rv_semi_amplitude(mp, mstar, period_s):
    return (2 * math.pi * G / period_s) ** (1 / 3) * mp / (mstar + mp) ** (2 / 3)


def transit_depth(rp, rstar):
    return (rp / rstar) ** 2


def transit_duration_hours(period_days, rstar, a):
    return period_days * 24 / math.pi * math.asin(rstar / a)


def equilibrium_temperature(tstar, rstar, a, albedo):
    return tstar * math.sqrt(rstar / (2 * a)) * (1 - albedo) ** 0.25


def numeric_derivative(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)


def trapezoid(f, a, b, n=10000):
    step = (b - a) / n
    return step * (sum(f(a + i * step) for i in range(1, n)) + (f(a) + f(b)) / 2)


def projectile_range(v, angle_deg, g=G0):
    return v**2 * math.sin(2 * math.radians(angle_deg)) / g


def kinetic_energy(m, v):
    return m * v**2 / 2


def fall_speed(h, g=G0):
    return math.sqrt(2 * g * h)


def fall_time(h, g=G0):
    return math.sqrt(2 * h / g)


def gibbs_peak(n=400, steps=3000):
    best = 0.0
    for i in range(1, steps):
        x = math.pi * i / steps / 20
        v = sum(4 / math.pi * math.sin((2 * k - 1) * x) / (2 * k - 1) for k in range(1, n + 1))
        best = max(best, v)
    return best


def eigenvalues_2x2(a, b, c, d):
    tr, det = a + d, a * d - b * c
    root = math.sqrt(tr * tr - 4 * det)
    return (tr + root) / 2, (tr - root) / 2


def agm(a, b):
    for _ in range(40):
        a, b = (a + b) / 2, math.sqrt(a * b)
    return a


def action_perturbed(a, T=2.0, m=1.0, g=G0, n=20000):
    total = 0.0
    dt = T / n
    for i in range(n):
        t = (i + 0.5) * dt
        x = g * t * (T - t) / 2 + a * math.sin(math.pi * t / T)
        v = g * (T - 2 * t) / 2 + a * math.pi / T * math.cos(math.pi * t / T)
        total += (0.5 * m * v * v - m * g * x) * dt
    return total


FORMULAS = {
    "escape_velocity_earth_km_s": lambda: escape_velocity(M_EARTH, R_EARTH) / 1e3,
    "escape_velocity_sun_km_s": lambda: escape_velocity(M_SUN, R_SUN) / 1e3,
    "schwarzschild_radius_sun_km": lambda: schwarzschild_radius(M_SUN) / 1e3,
    "schwarzschild_radius_earth_mm": lambda: schwarzschild_radius(M_EARTH) * 1e3,
    "weight_60kg_newton": lambda: G * M_EARTH * 60 / R_EARTH**2,
    "cart_force_newton": lambda: 10 * 2,
    "gamma_at_0_1c": lambda: lorentz_gamma(0.1),
    "gamma_at_0_9c": lambda: lorentz_gamma(0.9),
    "energy_one_gram_joule": lambda: 1e-3 * C**2,
    "hawking_temperature_sun_kelvin": lambda: hawking_temperature(M_SUN),
    "bh_entropy_sun_kb": lambda: bh_entropy_over_kb(M_SUN),
    "evaporation_time_sun_years": lambda: evaporation_time_years(M_SUN),
    "page_time_fraction_4d": page_time_fraction,
    "coins_8_arrangements": lambda: 2**8,
    "three_times_ten_to_eight": lambda: 3 * 10**8,
    "earth_orbital_period_days": lambda: kepler_period_days(AU, M_SUN),
    "solar_constant_w_m2": lambda: L_SUN / (4 * math.pi * AU**2),
    "transit_depth_jupiter_sun_percent": lambda: transit_depth(R_JUPITER, R_SUN) * 100,
    "transit_depth_earth_sun_ppm": lambda: transit_depth(R_EARTH, R_SUN) * 1e6,
    "transit_duration_earth_hours": lambda: transit_duration_hours(kepler_period_days(AU, M_SUN), R_SUN, AU),
    "transit_probability_earth_percent": lambda: R_SUN / AU * 100,
    "rv_sun_from_jupiter_m_s": lambda: rv_semi_amplitude(M_JUPITER, M_SUN, JUPITER_PERIOD_YEARS * YEAR),
    "rv_sun_from_earth_cm_s": lambda: rv_semi_amplitude(M_EARTH, M_SUN, YEAR) * 100,
    "doppler_shift_12_5_m_s": lambda: 12.5 / C,
    "earth_equilibrium_temperature_k": lambda: equilibrium_temperature(T_SUN, R_SUN, AU, 0.3),
    "snr_example_84ppm": lambda: 84 / 300 * math.sqrt(1000),
    "pair_amplitude_probability": lambda: (1 / math.sqrt(2)) ** 2,
    "position_linear_3s": lambda: 10 + 20 * 3,
    "kmh_72_to_m_s": lambda: 72 / 3.6,
    "sunlight_travel_minutes": lambda: AU / C / 60,
    "derivative_free_fall_2s": lambda: numeric_derivative(lambda t: G0 * t**2 / 2, 2),
    "ramp_rise_30deg_10m": lambda: 10 * math.sin(math.radians(30)),
    "area_under_v_2s": lambda: trapezoid(lambda t: G0 * t, 0, 2),
    "vector_3_4_magnitude": lambda: math.hypot(3, 4),
    "vector_3_4_angle_deg": lambda: math.degrees(math.atan2(4, 3)),
    "accel_0_100_kmh_10s": lambda: (100 / 3.6) / 10,
    "distance_0_100_kmh_10s": lambda: (100 / 3.6) / 10 * 10**2 / 2,
    "free_fall_speed_2s": lambda: G0 * 2,
    "free_fall_distance_2s": lambda: G0 * 2**2 / 2,
    "moon_surface_gravity": lambda: G * M_MOON / R_MOON**2,
    "projectile_range_20ms_45deg": lambda: projectile_range(20, 45),
    "projectile_range_20ms_30deg": lambda: projectile_range(20, 30),
    "projectile_max_height_20ms_45deg": lambda: (20 * math.sin(math.radians(45))) ** 2 / (2 * G0),
    "skater_accel_60kg": lambda: 120 / 60,
    "skater_accel_40kg": lambda: 120 / 40,
    "earth_accel_from_60kg_person": lambda: 60 * G0 / M_EARTH,
    "moon_centripetal_accel": lambda: 4 * math.pi**2 * MOON_ORBIT_RADIUS / (MOON_SIDEREAL_DAYS * DAY) ** 2,
    "g_over_3600": lambda: G0 / 3600,
    "curve_accel_20ms_50m": lambda: 20**2 / 50,
    "water_pressure_10m_kpa": lambda: RHO_WATER * G0 * 10 / 1e3,
    "water_10m_in_atm": lambda: RHO_WATER * G0 * 10 / ATM,
    "ice_submerged_fraction_seawater": lambda: RHO_ICE / RHO_SEAWATER,
    "torque_30kg_2m": lambda: 30 * G0 * 2,
    "torque_40kg_1_5m": lambda: 40 * G0 * 1.5,
    "ke_car_20ms_kj": lambda: kinetic_energy(1000, 20) / 1e3,
    "ke_car_40ms_kj": lambda: kinetic_energy(1000, 40) / 1e3,
    "momentum_car_20ms": lambda: 1000 * 20,
    "impulse_force_0_1s": lambda: 0.4 * 10 / 0.1,
    "impulse_force_0_01s": lambda: 0.4 * 10 / 0.01,
    "skater_spin_rev_s": lambda: 1 * 3,
    "earth_perihelion_aphelion_speed_ratio": lambda: (1 + EARTH_ECCENTRICITY) / (1 - EARTH_ECCENTRICITY),
    "pe_60kg_3m": lambda: 60 * G0 * 3,
    "drop_20m_speed": lambda: fall_speed(20),
    "pendulum_0_5m_speed": lambda: fall_speed(0.5),
    "inelastic_final_speed": lambda: 1000 * 20 / (1000 + 1000),
    "inelastic_ke_fraction_lost": lambda: 1 - kinetic_energy(2000, 10) / kinetic_energy(1000, 20),
    "hose_speed_quarter_area": lambda: 2 * 4,
    "torricelli_5m": lambda: fall_speed(5),
    "bernoulli_dp_kpa": lambda: RHO_WATER * (8**2 - 2**2) / 2 / 1e3,
    "fall_time_5m": lambda: fall_time(5),
    "c14_fraction_two_half_lives_percent": lambda: 0.5**2 * 100,
    "doubling_30_times": lambda: 2**30,
    "doubling_time_7_percent_years": lambda: math.log(2) / math.log(1.07),
    "two_dice_seven_percent": lambda: 6 / 36 * 100,
    "at_least_one_six_in_four_percent": lambda: (1 - (5 / 6) ** 4) * 100,
    "pendulum_period_1m": lambda: 2 * math.pi * math.sqrt(1 / G0),
    "pendulum_dimensional_1m": lambda: math.sqrt(1 / G0),
    "heartbeats_80_years": lambda: 70 * 60 * 24 * 365 * 80,
    "mean_uncertainty_100": lambda: 0.08 / math.sqrt(100),
    "eratosthenes_stadia": lambda: 360 / 7.2 * 5000,
    "small_angle_error_10deg_percent": lambda: (math.radians(10) - math.sin(math.radians(10))) / math.sin(math.radians(10)) * 100,
    "e_series_10_terms": lambda: sum(1 / math.factorial(k) for k in range(11)),
    "euler_identity_real": lambda: math.cos(math.pi),
    "one_plus_i_squared_imag": lambda: ((1 + 1j) ** 2).imag,
    "within_one_sigma_percent": lambda: math.erf(1 / math.sqrt(2)) * 100,
    "within_two_sigma_percent": lambda: math.erf(2 / math.sqrt(2)) * 100,
    "transit_snr_30_points": lambda: 0.004 / (0.006 / math.sqrt(30)),
    "gibbs_overshoot_percent": lambda: (gibbs_peak() - 1) / 2 * 100,
    "eigen_2112_largest": lambda: eigenvalues_2x2(2, 1, 1, 2)[0],
    "eigen_2112_smallest": lambda: eigenvalues_2x2(2, 1, 1, 2)[1],
    "n2_mean_speed_300k": lambda: math.sqrt(8 * K_B * 300 / (math.pi * 4.65e-26)),
    "heat_1l_water_20_to_100_kj": lambda: 4186 * 1 * 80 / 1e3,
    "isothermal_doubling_work_300k": lambda: 8.314 * 300 * math.log(2),
    "carnot_800_300_percent": lambda: (1 - 300 / 800) * 100,
    "all_100_left_probability": lambda: 0.5**100,
    "mixing_100_bits": lambda: math.log2(math.comb(100, 50)),
    "ice_fusion_entropy": lambda: 6010 / 273.15,
    "ice_dg_minus_10c": lambda: 6010 - 263.15 * 6010 / 273.15,
    "coin_90_entropy_bits": lambda: -(0.9 * math.log2(0.9) + 0.1 * math.log2(0.1)),
    "landauer_300k_joule": lambda: K_B * 300 * math.log(2),
    "halvings_300k_to_1nk": lambda: math.ceil(math.log2(300 / 1e-9)),
    "ising_onsager_tc": lambda: 2 / math.log(1 + math.sqrt(2)),
    "ice_latent_heat_kj_kg": lambda: 6010 / 0.018015 / 1e3,
    "euler_h05_at_1": lambda: (1 - 0.5) ** 2,
    "euler_h01_at_1": lambda: 0.9**10,
    "exact_decay_at_1": lambda: math.exp(-1),
    "spring_period_05kg_20nm": lambda: 2 * math.pi * math.sqrt(0.5 / 20),
    "pendulum_90deg_ratio": lambda: 1 / agm(1, math.cos(math.radians(45))),
    "foucault_paris_hours": lambda: 23.934 / math.sin(math.radians(48.846)),
    "doublings_1e6": lambda: math.log2(1e6),
    "action_delta_a05": lambda: action_perturbed(0.5) - action_perturbed(0.0),
    "pendulum_separatrix_energy": lambda: 2 * 1 * G0 * 1,
    "earth_orbital_angular_momentum": lambda: M_EARTH * 29780 * AU,
    "electrons_per_coulomb": lambda: 1 / E_CHARGE,
    "coulomb_constant": lambda: K_E,
    "electric_over_gravity_pe": lambda: K_E * E_CHARGE**2 / (G * M_PROTON * M_ELECTRON),
    "coulomb_two_1uc_10cm": lambda: K_E * 1e-6 * 1e-6 / 0.1**2,
    "field_1nc_1m": lambda: K_E * 1e-9 / 1**2,
    "electron_speed_100v": lambda: math.sqrt(2 * E_CHARGE * 100 / M_ELECTRON),
    "electron_radius_1e6_1mt": lambda: M_ELECTRON * 1e6 / (E_CHARGE * 1e-3),
    "plate_capacitor_1m2_1mm_nf": lambda: EPS0 * 1 / 1e-3 * 1e9,
    "rc_charge_one_tau_percent": lambda: (1 - math.exp(-1)) * 100,
    "shower_current_5500w_220v": lambda: 5500 / 220,
    "shower_resistance_5500w_220v": lambda: 220**2 / 5500,
    "drift_speed_copper_1a_1mm2": lambda: 1 / (N_COPPER * E_CHARGE * 1e-6),
    "series_100_200_9v_ma": lambda: 9 / 300 * 1e3,
    "parallel_100_200": lambda: 1 / (1 / 100 + 1 / 200),
    "wire_field_10a_1cm_ut": lambda: MU0 * 10 / (2 * math.pi * 0.01) * 1e6,
    "coil_emf_100turns": lambda: 100 * 0.01 * 0.1 / 0.1,
    "generator_peak_emf_60hz": lambda: 200 * 0.05 * 0.02 * 2 * math.pi * 60,
}
