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
    "pair_amplitude_probability": lambda: (1 / math.sqrt(2)) ** 2,
}
