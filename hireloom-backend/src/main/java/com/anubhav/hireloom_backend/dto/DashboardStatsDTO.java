package com.anubhav.hireloom_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DashboardStatsDTO {
    public long total;
    public long applied;
    public long oa;
    public long interview;
    public long rejected;
    public long offer;
}
