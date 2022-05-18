function weaponJSON() {
    let data = {
        "Normal": {
            "Hotspot": {

            }
        },
        "Red": {
            "Hotspot": {

            }
        },
        "Black": {
            "Hotspot": {

            }
        },
        "Premium": {
            "CM Proton Arc": {
                "Class": "Laser",
                "Type": "Energy",
                "Damage": 900,
                "DOT": 0,
                "RPS": 30,
                "Clip": 650,
                "Reload": 5.0,
                "Pierce": 1,
                "Pellets": 1,
                "Crit": 0
            }
        },
        "Faction": {
            "Krakatoa": {

            }
        }
    }
    return data;
}

function armourDPSJSON() {
    // Faction gear, except for OW chest, is classified as normal
    let data = {
        "Helmet": {
            "Hardplate": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": -5
                },
                "Red": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": -8
                },
                "Black": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": -8
                }
            },
            "Dragonfly": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0.04,
                    "Reload": 0
                },
                "Red": {
                    "Crit": 0,
                    "Dmg": 0.05,
                    "Reload": 0
                },
                "Black": {
                    "Crit": 0,
                    "Dmg": 0.05,
                    "Reload": 0
                }
            },
            "Titan": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0.1,
                    "Reload": 0
                },
                "Red": {
                    "Crit": 0,
                    "Dmg": 0.15,
                    "Reload": 0
                },
                "Black": {
                    "Crit": 0,
                    "Dmg": 0.15,
                    "Reload": 0
                }
            },
            "Medusa": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 6
                },
                "Red": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 9
                },
                "Black": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 9
                }
            },
            "Dynamo": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0.03,
                    "Reload": 0
                }
            },
            "Mastodon": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": -9
                }
            },
            "Overwatch": {
                "Normal": {
                    "Crit": 11,
                    "Dmg": 0,
                    "Reload": -8
                }
            },
            "Mako": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 6
                }
            },
            "Other": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 0
                }
            }
        },
        "Vest": {
            "Overwatch": {
                "Reload": 9
            },
            "Other": {
                "Reload": 0
            }
        },
        "Gloves": {
            "Hardplate": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": -5
                },
                "Red": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": -10
                },
                "Black": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": -10
                }
            },
            "Dragonfly": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 3
                },
                "Red": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 5
                },
                "Black": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 5
                }
            },
            "Ronson": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0.02,
                    "Reload": 0
                },
                "Red": {
                    "Crit": 0,
                    "Dmg": 0.03,
                    "Reload": 0
                },
                "Black": {
                    "Crit": 0,
                    "Dmg": 0.03,
                    "Reload": 0
                }
            },
            "Titan": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 10
                },
                "Red": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 15
                },
                "Black": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 15
                }
            },
            "Medusa": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0.04,
                    "Reload": 0
                },
                "Red": {
                    "Crit": 0,
                    "Dmg": 0.05,
                    "Reload": 0
                },
                "Black": {
                    "Crit": 0,
                    "Dmg": 0.05,
                    "Reload": 0
                }
            },
            "Dynamo": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 5
                }
            },
            "Overwatch": {
                "Normal": {
                    "Crit": 6,
                    "Dmg": 0,
                    "Reload": -4
                }
            },
            "Mako": {
                "Normal": {
                    "Crit": 3,
                    "Dmg": 0,
                    "Reload": 10
                }
            },
            "Other": {
                "Normal": {
                    "Crit": 0,
                    "Dmg": 0,
                    "Reload": 0
                }
            }
        }
    }
    return data;
}

function weaponMasteries(weaponClass, gunMasteryLevel) {
    let data = {
        "Pistol": {
            "gun_dmg": 5 * (gunMasteryLevel >= 2),
            "gun_rps": 25 * (gunMasteryLevel == 5),
            "gun_critc": 0,
            "gun_critdmg": 0,
            "gun_capacity": `${10 * (gunMasteryLevel >= 3)}%`,
            "gun_adaptive": 0,
            "gun_pierce": 0,
            "gun_reload": 0,
            "flamer3": false,
            "shotgun5": 0
        },
        "Shotgun": {
            "gun_dmg": 1,
            "gun_rps": 1,
            "gun_critc": 0,
            "gun_critdmg": 0,
            "gun_capacity": 0,
            "gun_adaptive": 0,
            "gun_pierce": 0,
            "gun_reload": 5 * (gunMasteryLevel >= 1),
            "flamer3": false,
            "shotgun5": 1 * (gunMasteryLevel == 5)
        },
        "SMG": {
            "gun_dmg": 1,
            "gun_rps": 15 * (gunMasteryLevel >= 4),
            "gun_critc": 0,
            "gun_critdmg": 0,
            "gun_capacity": 15  * (gunMasteryLevel >= 2),
            "gun_adaptive": 0,
            "gun_pierce": 1 * (gunMasteryLevel == 5),
            "gun_reload": 0,
            "flamer3": false,
            "shotgun5": 0
        },
        "Assault Rifle": {
            "gun_dmg": 5 * (gunMasteryLevel >= 4),
            "gun_rps": 1,
            "gun_critc": 2 * (gunMasteryLevel >= 1),
            "gun_critdmg": 0,
            "gun_capacity": 10 * (gunMasteryLevel >= 2),
            "gun_adaptive": 0,
            "gun_pierce": 1 * (gunMasteryLevel == 5),
            "gun_reload": 0,
            "flamer3": false,
            "shotgun5": 0
        },
        "Sniper": {
            "gun_dmg": 5 * (gunMasteryLevel >= 1),
            "gun_rps": 1,
            "gun_critc": 5 * (gunMasteryLevel >= 3),
            "gun_critdmg": 25 * (gunMasteryLevel >= 4),
            "gun_capacity": 0,
            "gun_adaptive": 0,
            "gun_pierce": 1 * (gunMasteryLevel >= 2),
            "gun_reload": 0,
            "flamer3": false,
            "shotgun5": 0
        },
        "Launcher": {
            "gun_dmg": 5 * (gunMasteryLevel >= 2),
            "gun_rps": 1,
            "gun_critc": 0,
            "gun_critdmg": 0,
            "gun_capacity": 0,
            "gun_adaptive": 25 * (gunMasteryLevel == 5),
            "gun_pierce": 2 * (gunMasteryLevel >= 4),
            "gun_reload": 0,
            "flamer3": false,
            "shotgun5": 0
        },
        "Flamethrower": {
            "gun_dmg": 1,
            "gun_rps": 1,
            "gun_critc": 0,
            "gun_critdmg": 0,
            "gun_capacity": 25 * (gunMasteryLevel >= 2),
            "gun_adaptive": 25 * (gunMasteryLevel >= 4),
            "gun_pierce": 1 * (gunMasteryLevel >= 1),
            "gun_reload": 0,
            "flamer3": (gunMasteryLevel >= 3),
            "shotgun5": 0
        },
        "LMG": {
            "gun_dmg": 5 * (gunMasteryLevel >= 1),
            "gun_rps": 1,
            "gun_critc": 0,
            "gun_critdmg": 0,
            "gun_capacity": 50 * (gunMasteryLevel >= 4),
            "gun_adaptive": 35 * (gunMasteryLevel == 5),
            "gun_pierce": 1 * (gunMasteryLevel >= 3),
            "gun_reload": 0,
            "flamer3": false,
            "shotgun5": 0
        },
        "Disc Thrower": {
            "gun_dmg": 0,
            "gun_rps": 0,
            "gun_critc": 0,
            "gun_critdmg": 0,
            "gun_capacity": 0,
            "gun_adaptive": 0,
            "gun_pierce": 0,
            "gun_reload": 0,
            "flamer3": false,
            "shotgun5": 0
        },
        "Laser": {
            "gun_dmg": 0,
            "gun_rps": 0,
            "gun_critc": 0,
            "gun_critdmg": 0,
            "gun_capacity": 0,
            "gun_adaptive": 0,
            "gun_pierce": 0,
            "gun_reload": 0,
            "flamer3": false,
            "shotgun5": 0
        }
    }
    return data[weaponClass];
}

function weaponCollections() {
    let data = {
        "Pistol": {
            "Normal": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Red": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 5
            },
            "Black": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            }
        },
        "SMG": {
            "Normal": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Red": {
                "dmg": 0,
                "rps": 5,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Black": {
                "dmg": 10,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            }
        },
        "Assault Rifle": {
            "Normal": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 10,
                "reload": 0
            },
            "Red": {
                "dmg": 5,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Black": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 3,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            }
        },
        "Shotgun": {
            "Normal": {
                "dmg": 5,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Red": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 5,
                "reload": 0
            },
            "Black": {
                "dmg": 0,
                "rps": 0,
                "pierce": 1,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            }
        },
        "Sniper": {
            "Normal": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 5,
                "reload": 0
            },
            "Red": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 10,
                "capacity": 0,
                "reload": 0
            },
            "Black": {
                "dmg": 5,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            }
        },
        "Launcher": {
            "Normal": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Red": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 5
            },
            "Black": {
                "dmg": 10,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            }
        },
        "Flamethrower": {
            "Normal": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Red": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Black": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            }
        },
        "LMG": {
            "Normal": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Red": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": "5%",
                "reload": 0
            },
            "Black": {
                "dmg": 0,
                "rps": 10,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            }
        },
        "Disc Thrower": {
            "Normal": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Red": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Black": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            }
        },
        "Laser": {
            "Normal": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Red": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            },
            "Black": {
                "dmg": 0,
                "rps": 0,
                "pierce": 0,
                "critc": 0,
                "critdmg": 0,
                "capacity": 0,
                "reload": 0
            }
        }
    }
    return data;
}